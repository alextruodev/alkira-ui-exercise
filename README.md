# Alkira UI Developer Take-Home Exercise

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Vitest
- React Testing Library

## Setup

```bash
git clone <repository-url>
cd alkira-ui-exercise
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Mock Users

### Read-only

```text
Email: viewer@alkira.test
Password: Viewer123!
```

### Read/write

```text
Email: editor@alkira.test
Password: Editor123!
```

## MFA

Use the following MFA code for both users:

```text
123456
```

## Test the Login / MFA Flow

Open the login page.
Sign in with one of the mock users.
Enter MFA code 123456.
Confirm that you are redirected to the protected dashboard.
Verify that:
- The read-only user has the Edit Configuration action disabled.
- The read/write user has the Edit Configuration action enabled.
Try invalid login credentials and an invalid MFA code to verify error handling.

## Automated Tests

Run the tests:

```bash
npm run test:run
```

Run linting:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

## Key Design Decisions and Assumptions

- Authentication is mocked because backend authentication is not required for this exercise.
- React Context manages authentication state.
- Login and MFA are separate states so a user is not fully authenticated until MFA succeeds.
- Protected routes redirect unauthenticated users to the login page.
- User roles control whether edit actions are enabled.
- React Hook Form and Zod are used for form handling and validation.
- Sign Up is a demo-only flow and does not create a persistent user.

## Known Limitations

- Authentication and MFA are mocked in the frontend.
- Sessions do not persist after a page refresh.
- The MFA code is static.
- Sign Up does not create a loggable user.
- Edit Configuration demonstrates access control but does not persist changes.