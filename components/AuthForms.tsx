"use client";

import { useActionState } from "react";
import { learnerGoals } from "@/data/siteContent";
import { logIn, signUp, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

function Feedback({ state }: { state: AuthState }) {
  if (state.error) {
    return (
      <p role="alert" className="font-semibold text-carnelian-deep">
        {state.error}
      </p>
    );
  }
  return null;
}

export function LoginForm({
  next,
  notice,
}: {
  next?: string;
  notice?: string;
}) {
  const [state, action, pending] = useActionState(logIn, initialState);

  return (
    <form action={action} className="space-y-4">
      {notice && !state.error && (
        <p role="alert" className="font-semibold text-carnelian-deep">
          {notice}
        </p>
      )}
      <input type="hidden" name="next" value={next ?? ""} />
      <div>
        <label htmlFor="login-email" className="field-label">
          Email address
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email ?? ""}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="field-label">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field"
        />
      </div>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, initialState);

  if (state.message) {
    return (
      <div role="status">
        <p className="h-card text-malachite">Check your inbox.</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="signup-name" className="field-label">
          Full name
        </label>
        <input
          id="signup-name"
          name="fullName"
          type="text"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          defaultValue={state.values?.fullName ?? ""}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="field-label">
          Email address
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email ?? ""}
          aria-describedby="signup-email-hint"
          className="field"
        />
        <p id="signup-email-hint" className="mt-1.5 text-sm">
          Already booked a class? Use the same email and your bookings will
          appear in your dashboard.
        </p>
      </div>
      <div>
        <label htmlFor="signup-password" className="field-label">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          aria-describedby="signup-password-hint"
          className="field"
        />
        <p id="signup-password-hint" className="mt-1.5 text-sm">
          At least 8 characters.
        </p>
      </div>
      <div>
        <label htmlFor="signup-goal" className="field-label">
          What brings you to Arabic?
        </label>
        <select
          id="signup-goal"
          name="goal"
          required
          defaultValue={state.values?.goal ?? ""}
          className="field"
        >
          <option value="" disabled>
            Choose your main goal
          </option>
          {learnerGoals.map((goal) => (
            <option key={goal.value} value={goal.value}>
              {goal.label}
            </option>
          ))}
        </select>
      </div>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Creating your account…" : "Create my free account"}
      </button>
    </form>
  );
}
