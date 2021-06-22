package common.server.rest;

import common.server.domain.CityBreak;
import common.server.domain.Hotel;
import common.server.domain.ProductPhoto;
import common.server.domain.Ticket;
import common.server.enums.ProductType;
import common.server.repository.BookingRepository;
import common.server.repository.CityBreakRepository;
import common.server.repository.HotelRepository;
import common.server.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
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
                                 @RequestParam(required = false) Double maxPrice,
                                 @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                 @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<Hotel> hotels = new ArrayList<>();
        if (maxPrice != null) {
            hotels = hotelRepository.findByCityAndPriceLessThanEqual(city, maxPrice);

        } else {
            hotels = hotelRepository.findByCity(city);
        }
        // Only return the hotels that have available rooms for the given date range
        return hotels.stream().filter(
                hotel ->
                        bookingRepository.findByProductIdAndStartDateGreaterThanAndEndDateLessThan(hotel.getId(), startDate, endDate).size() < hotel.getAvailableRooms())
                .collect(Collectors.toList());
    }

    @GetMapping("tickets")
    public List<Ticket> getTickets(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
            @RequestParam String departure,
            @RequestParam String destination) {
        return ticketRepository.findByDepartureAndDestinationAndDateOrderByHour(departure, destination, date);
    }

    @GetMapping("city-breaks")
    public List<CityBreak> getCityBreak(
            @RequestParam String city,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
    ) {
        return cityBreakRepository.findByCityAndDate(city, date);
    }

    @PostMapping("hotels")
    public Hotel createHotel(
            @RequestPart(name = "photo", required = false) MultipartFile photo,
            @RequestPart(name = "hotel", required = true) Hotel hotel
    ) throws IOException {
        if (photo != null) {
            ProductPhoto productPhoto = new ProductPhoto();
            productPhoto.setPhoto(photo.getBytes());
            productPhoto.setContentType(photo.getContentType());
            hotel.setPhoto(productPhoto);
        }
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
    public CityBreak createCityBreak(
            @RequestPart(name = "photo", required = false) MultipartFile photo,
            @RequestPart(name = "cityBreak", required = true) CityBreak cityBreak
    ) throws IOException {
        if (photo != null) {
            ProductPhoto productPhoto = new ProductPhoto();
            productPhoto.setPhoto(photo.getBytes());
            productPhoto.setContentType(photo.getContentType());
            cityBreak.setPhoto(productPhoto);
        }
        cityBreak.setType(ProductType.CITY_BREAK);
        return cityBreakRepository.save(cityBreak);
    }

}
