import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/site/legal'
import { org } from '@/lib/content'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — HopeBridge Foundation' },
      { name: 'description', content: 'How HopeBridge Foundation collects, uses and protects personal information.' },
    ],
  }),
  component: Privacy,
})

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="16 November 2026">
      <p>
        HopeBridge Foundation (“we”, “us”) respects your privacy. This policy
        explains what personal information we collect when you visit our
        website, donate, volunteer or contact us, and how we use and protect it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you provide, such as your name, email address, phone number and country.</li>
        <li>Donation details, such as amount, frequency, designation and payment method. Card numbers and M-Pesa PINs are handled by our payment providers and are never stored by us.</li>
        <li>Volunteer and partnership information you choose to share, such as skills and availability.</li>
        <li>Basic technical information, such as browser type and pages visited, to keep the site secure and working well.</li>
      </ul>
      <h2>How we use your information</h2>
      <ul>
        <li>To process donations and send receipts and acknowledgements.</li>
        <li>To respond to enquiries and coordinate volunteering and partnerships.</li>
        <li>To send updates about our work, where you have agreed to receive them.</li>
        <li>To meet legal, accounting and reporting obligations.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell or rent your personal information. We share it only with
        trusted service providers who help us operate — such as payment
        processors, email and hosting providers — under appropriate safeguards,
        or where required by law.
      </p>
      <h2>Storage and security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your
        information, including encrypted connections and restricted
        administrative access. We keep personal information only as long as
        needed for the purposes above or as required by law.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of or deletion of your personal
        information, object to its processing, or unsubscribe from
        communications at any time by contacting us.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to {org.contact.email} or{' '}
        {org.contact.address}.
      </p>
    </LegalPage>
  )
}
