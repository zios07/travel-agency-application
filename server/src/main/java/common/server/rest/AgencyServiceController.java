package common.server.rest;

import common.server.domain.CityBreak;
import common.server.domain.Hotel;
import common.server.domain.Ticket;
import common.server.enums.ProductType;
import common.server.repository.BookingRepository;
import common.server.repository.CityBreakRepository;
import common.server.repository.HotelRepository;
import common.server.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/agency-services")
@RequiredArgsConstructor
public class AgencyServiceController {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final TicketRepository ticketRepository;
    private final CityBreakRepository cityBreakRepository;

    @GetMapping("hotels/{city}")
    public List<Hotel> getHotels(@PathVariable String city,
                                 @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                 @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<Hotel> hotels = hotelRepository.findByCity(city);
        // Only return the hotels that have available rooms for the given date range
        return hotels.stream().filter(
                hotel ->
                        bookingRepository.findByProductIdAndStartDateGreaterThanAndEndDateLessThan(hotel.getId(), startDate, endDate).size() < hotel.getAvailableRooms())
                .collect(Collectors.toList());
    }

    @GetMapping("tickets/{city}")
    public List<Ticket> getTickets(@PathVariable String city) {
        return ticketRepository.findByCity(city);
    }

    @GetMapping("city-breaks/{city}")
    public List<CityBreak> getCityBreak(@PathVariable String city) {
        return cityBreakRepository.findByCity(city);
    }

    @PostMapping("hotels")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        hotel.setAvailableRooms(hotel.getTotalRooms());
        hotel.setType(ProductType.HOTEL);
        return hotelRepository.save(hotel);
    }

    @PostMapping("tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        ticket.setType(ProductType.TICKET);
        return ticketRepository.save(ticket);
    }

    @PostMapping("city-breaks")
    public CityBreak createCityBreak(@RequestBody CityBreak cityBreak) {
        cityBreak.setType(ProductType.CITY_BREAK);
        return cityBreakRepository.save(cityBreak);
    }

}
