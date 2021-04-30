package common.server.repository;

import common.server.domain.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HotelBookingRepository extends JpaRepository<HotelBooking, Long> {

    List<HotelBooking> findByHotelId(long hotelId);

    /**
     * retrieve the bookings which fall in the [startDate - endDate] range for the hotel with the given ID
     * @param hotelId
     * @param startDate
     * @param endDate
     * @return
     */
    List<HotelBooking> findByHotelIdAndStartDateGreaterThanAndEndDateLessThan(long hotelId, LocalDate startDate, LocalDate endDate);

}
