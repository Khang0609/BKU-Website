# Frontend Architectural Logs

## 2026-04-10
- **Feature**: Implementing Student Health Insurance Module.
- **Accomplishments**:
    - Created Premium UI for Health Insurance viewing (`/profile/health-insurance`).
    - Implemented **Health Insurance Update Request** flow (VssID-inspired design).
    - Created `HealthInsuranceUpdateModal` with animated form and file upload UI.
    - Created `RequestHistoryList` to track status of update requests (Pending, Approved, Rejected).
    - Established `types/request.ts` and split `services/request.service.ts` into client/server parts to fix `next/headers` import errors in Client Components.
    - Updated profile navigation constants to enable "Medical Info" section.
- **Architectural Note**: Services using `serverFetch` (containing server-only headers) MUST be kept in separate files (e.g., `*.server.ts`) from client-side services to avoid build/runtime errors in Client Components.
