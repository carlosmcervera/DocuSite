"""Build localized share cards using only approved local brand assets and fonts."""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
import cairosvg

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'assets'
INK, GROUND, ACCENT, MUTED = '#14181C', '#F4F2EE', '#FF8A3D', '#C9CDD2'

def font(name, size):
    face = TTFont(ROOT / 'fonts' / name)
    face.flavor = None
    data = BytesIO()
    face.save(data)
    data.seek(0)
    return ImageFont.truetype(data, size)

logo = Image.open(BytesIO(cairosvg.svg2png(url=str(ROOT / 'brand' / 'logo-new.svg'), output_width=72, output_height=72))).convert('RGBA')
texts = {
    'es': (['Sal de la obra', 'con el acta hecha.'], 'Actas de obra por voz · Fotos, acuerdos y firmas', '3 actas gratis por empresa al darse de alta'),
    'ca': (['Surt de l’obra', 'amb l’acta feta.'], 'Actes d’obra per veu · Fotos, acords i signatures', '3 actes gratis per empresa en donar-se d’alta'),
    'en': (['Leave the site', 'with the minutes done.'], 'Voice-based site records · Photos, actions and signatures', '3 free records per company on signup'),
}
for lang, (lines, subtitle, offer) in texts.items():
    image = Image.new('RGB', (1200, 630), INK)
    draw = ImageDraw.Draw(image)
    image.paste(logo, (72, 60), logo)
    draw.text((162, 72), 'DocuSite', font=font('archivo-0.woff2', 46), fill=GROUND)
    for i, line in enumerate(lines):
        size = 68 if lang == 'en' else 76
        draw.text((72, 204 + i * 86), line, font=font('archivo-0.woff2', size), fill=GROUND if i == 0 else ACCENT)
    draw.text((76, 414), subtitle, font=font('inter-0.woff2', 26), fill=MUTED)
    draw.line((72, 486, 1128, 486), fill='#4A525C', width=2)
    draw.text((76, 518), offer, font=font('inter-3.woff2', 27), fill=GROUND)
    image.save(ROOT / 'brand' / f'social-{lang}.png', optimize=True)
    print(f'Created social-{lang}.png (1200x630)')
