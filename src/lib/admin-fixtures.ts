/**
 * SAMPLE data for the admin dashboard preview. Replace with Netlify Database
 * queries (behind Netlify Identity admin role checks) in the backend milestone.
 */
export const adminDonations = [
  { id: 'HB-DEMO-0007', donor: 'Sample Donor A', amount: 2500, currency: 'KES', method: 'M-Pesa', frequency: 'One-time', status: 'Completed', date: '2026-11-15' },
  { id: 'HB-DEMO-0006', donor: 'Sample Donor B', amount: 50, currency: 'USD', method: 'Card', frequency: 'Monthly', status: 'Completed', date: '2026-11-14' },
  { id: 'HB-DEMO-0005', donor: 'Anonymous', amount: 10000, currency: 'KES', method: 'M-Pesa', frequency: 'One-time', status: 'Pending', date: '2026-11-14' },
  { id: 'HB-DEMO-0004', donor: 'Sample Donor C', amount: 100, currency: 'USD', method: 'PayPal', frequency: 'One-time', status: 'Completed', date: '2026-11-12' },
  { id: 'HB-DEMO-0003', donor: 'Sample Donor D', amount: 1000, currency: 'KES', method: 'M-Pesa', frequency: 'Monthly', status: 'Failed', date: '2026-11-11' },
] as const

export const adminVolunteers = [
  { name: 'Sample Volunteer 1', interest: 'Education & Scholarships', availability: 'Weekends', location: 'Nairobi', status: 'New' },
  { name: 'Sample Volunteer 2', interest: 'Healthcare & Medical Outreach', availability: 'Occasional events', location: 'Kisumu', status: 'Contacted' },
  { name: 'Sample Volunteer 3', interest: 'Remote / skills-based', availability: 'Remote only', location: 'London, UK', status: 'Active' },
] as const

export const adminCampaigns = [
  { title: 'Back-to-School Drive', status: 'Live', ends: '2027-01-15' },
  { title: 'Drought Response Appeal', status: 'Live', ends: '2026-12-31' },
  { title: 'Run for Hope', status: 'Draft', ends: '2027-03-01' },
] as const
