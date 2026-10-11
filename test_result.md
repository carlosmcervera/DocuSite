#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "DocuSite: marca del usuario, portada corta y páginas ES/EN; oferta aprobada primeros 3 documentos gratis; ejemplo autorizado y formulario conectado a admin"
backend:
  - task: "Captura, contexto de oferta/documento, admin y CSV"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: high
    needs_retesting: false
    status_history:
      - working: true
        agent: testing
        comment: "iteration_1: 25/25 API tests passed. Report incorrectly says rate limiting tested; suite explicitly skipped that optional test. No application bugs found."
frontend:
  - task: "Self-serve app CTAs, verified-phone/email trial, secondary contact routes"
    implemented: true
    working: true
    file: "/app/frontend/src/components/AppAccess.jsx"
    stuck_count: 0
    priority: high
    needs_retesting: false
    status_history:
      - working: true
        agent: testing
        comment: "Previous brand/routing/lead phase passed iteration1/2; portable tests25/25 and mobile360."
      - working: "NA"
        agent: main
        comment: "New user pivot implemented: primary register/AppStore/GooglePlay ALL intentionally placeholders (empty appLinks config). Honest dialog, no account/download/network. First3docs requires BOTH phone and email validation IN APP. Home no form. Exact3steps company/unlimitedmembers -> project -> Nuevo Documento/type/photos. Contact form now ONLY secondary inquiry, /es/contacto & /en/contact with old/demo redirects, plan_interest null unless paid context; utm.intent=contact, NOT offerfree. Full yarn build and desktop screenshots passed."
metadata:
  created_by: main_agent
  version: "4.0"
  test_sequence: 4
  run_ui: true
test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: high_first
agent_communication:
  - agent: main
    message: "FINAL: Read iteration_3 and iteration_4 completely and reviewed updated backend_test.py. Iteration4 resolves test-fixture rate-limit interference and incorrect zero-hours wording: zero valid gives0, blank invalid givesdash. 42/42 backend tests, mobile360/390, nested dialogs and all28 routes passed; no remaining application bugs reported. New home/standaloneROI defaults10docs,1.5h,45EUR/h =15h/675EUR; supplied real badge images rendered, destinations intentionally MOCKED. Final yarn build and Python compile passed. PRD updated. Email deferred."
  - agent: main
    message: "Test newest selfserve conversion pivot. All3appbuttons intentionally MOCKED by user; no need integrate auth/stores. Contact remains real. Backend unchanged. Keep API testfiles portable: no hardcoded URLs/tokens, no bareexcept/no secret logging. Clean ONLY your TEST_ records. Final lint py_compile/ruffcheck before handoff."
