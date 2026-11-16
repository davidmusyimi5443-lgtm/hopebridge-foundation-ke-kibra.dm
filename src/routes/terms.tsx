import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/site/legal'
import { org } from '@/lib/content'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Use — HopeBridge Foundation' },
      { name: 'description', content: 'Terms governing use of the HopeBridge Foundation website and donations.' },
    ],
  }),
  component: Terms,
})

function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="16 November 2026">
      <p>
        By using the HopeBridge Foundation website you agree to these terms. If
        you do not agree, please do not use the site.
      </p>
      <h2>Use of the website</h2>
      <p>
        You may use this website for lawful purposes only. You must not attempt
        to disrupt the site, access restricted areas without authorisation, or
        submit false or harmful information.
      </p>
      <h2>Donations</h2>
      <ul>
        <li>Donations are voluntary and, once processed, are generally non-refundable. If you believe a donation was made in error, contact us promptly and we will review your request.</li>
        <li>Recurring donations continue until you cancel them. You can change or cancel a recurring gift at any time by contacting us.</li>
        <li>Gifts designated to a specific programme or project are used for that purpose. If a project is fully funded or cannot proceed, we may apply the gift where it is most needed, informing donors where practical.</li>
        <li>Payments are processed by third-party providers (such as M-Pesa, card processors and PayPal) subject to their own terms.</li>
      </ul>
      <h2>Content and intellectual property</h2>
      <p>
        Text, images, logos and other content on this website belong to
        HopeBridge Foundation or are used with permission. You may share our
        content for non-commercial purposes with attribution, but may not alter
        it or imply endorsement.
      </p>
      <h2>Third-party links</h2>
      <p>
        Our website may link to other sites. We are not responsible for their
        content or privacy practices.
      </p>
      <h2>Disclaimer and liability</h2>
      <p>
        We work to keep information accurate and up to date but provide the
        website “as is” without warranties. To the extent permitted by law, we
        are not liable for losses arising from use of the site.
      </p>
      <h2>Changes and contact</h2>
      <p>
        We may update these terms from time to time. Questions can be sent to{' '}
        {org.contact.email}.
      </p>
    </LegalPage>
  )
}
