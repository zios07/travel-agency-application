package common.server.repository;

import common.server.domain.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * retrieve the bookings which fall in the [startDate - endDate] range for the hotel with the given ID
     *
     * @param productId
     * @param startDate
     * @param endDate
     * @return
     */
    List<Booking> findByProductIdAndStartDateGreaterThanAndEndDateLessThan(long productId, LocalDate startDate, LocalDate endDate);

    List<Booking> findByUserIdAndConfirmed(Long id, boolean confirmed);
}
