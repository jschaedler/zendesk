import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '@zendesk/types';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'zendesk-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TicketsComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  columnsToDisplay = ['subject', 'type', 'priority', 'status', 'updated_at'];
  pageSizeOptions = [25];
  expandedTicket!: Ticket | null;

  constructor(public auth: AuthService, public tickets: TicketService) {
    this.tickets.query().subscribe((tickets) => {
      if (tickets) {
        this.dataSource.data = tickets;
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
