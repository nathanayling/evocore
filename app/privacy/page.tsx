export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        EvoCore respects your privacy. We only use account information required
        to authenticate you, check your Evo product access, and provide the
        EvoCore intelligence experience.
      </p>
      <p>
        We may process your email address, authentication provider details,
        entitlement status, and usage activity within EvoCore.
      </p>
      <p>
        We do not sell personal data. Third-party services such as Firebase,
        OpenAI, and sports data providers may process data required to deliver
        the service.
      </p>
    </LegalPage>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <div className="evo-card mt-8 space-y-5 p-6 text-white/65">{children}</div>
    </div>
  );
}