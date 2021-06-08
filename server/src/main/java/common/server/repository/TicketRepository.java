package common.server.repository;

import common.server.domain.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByDepartureAndDestinationAndDateAndHour(String departure, String destination, LocalDate date, int hour);
}
