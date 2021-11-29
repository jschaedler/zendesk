export interface Ticket {
  url: string;
  id: string;
  created_at: string;
  updated_at: string;
  type: 'problem' | 'incendent' | 'question' | 'task';
  subject: string;
  description: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
  tags: Array<string>;

  // Some fields have been intentionally left out
}
