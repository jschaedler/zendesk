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

export interface TicketResponse {
  tickets: Array<Ticket>;
  meta: {
    has_more: boolean;
    after_cursor: string;
    before_cursor: string;
  };
  links: {
    next: string;
    prev: string;
  };
}
