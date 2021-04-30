package common.server.rest;

import common.server.domain.CityBreak;
import common.server.domain.Hotel;
import common.server.domain.Ticket;
import common.server.repository.CityBreakRepository;
import common.server.repository.HotelBookingRepository;
import common.server.repository.HotelRepository;
import common.server.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("agency-services")
@RequiredArgsConstructor
public class AgencyServiceController {

    private final HotelBookingRepository hotelBookingRepository;
    private final HotelRepository hotelRepository;
    private final TicketRepository ticketRepository;
    private final CityBreakRepository cityBreakRepository;

    @GetMapping("hotels/{city}")
    public List<Hotel> getHotels(@PathVariable String city,
                                 @RequestParam LocalDate startDate,
                                 @RequestParam LocalDate endDate) {
        List<Hotel> hotels = hotelRepository.findByCity(city);
        // Only return the hotels that have available rooms for the given date range
        return hotels.stream().filter(hotel -> hotelBookingRepository.findByHotelIdAndStartDateGreaterThanAndEndDateLessThan(hotel.getId(), startDate, endDate).size() < hotel.getAvailableRooms()).collect(Collectors.toList());
    }

    @GetMapping("tickets/{city}")
    public List<Ticket> getTickets(@PathVariable String city) {
        return ticketRepository.findByCity(city);
    }

    @GetMapping("city-breaks/{city}")
    public List<CityBreak> getCityBreaks(@PathVariable String city) {
        return cityBreakRepository.findByCity(city);
    }

}