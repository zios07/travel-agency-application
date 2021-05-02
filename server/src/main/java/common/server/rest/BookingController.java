package common.server.rest;

import common.server.domain.Hotel;
import common.server.domain.Booking;
import common.server.domain.User;
import common.server.exception.NotFoundException;
import common.server.repository.BookingRepository;
import common.server.repository.HotelRepository;
import common.server.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/bookings")
@RequiredArgsConstructor
@Validated
public class BookingController {

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final UserService userService;

    @PostMapping(value = "hotel")
    public Booking addBooking(@RequestBody @Valid Booking booking) throws NotFoundException {
        Hotel hotel = hotelRepository.findById(booking.getProduct().getId()).get();
        if (hotel.getTotalRooms() < 1) {
            throw new IllegalArgumentException("Hotel is full for the given dates");
        }
        hotel.setAvailableRooms(hotel.getAvailableRooms() - 1);
        hotelRepository.save(hotel);
        booking.setUser(userService.getConnectedUser());
        booking.setConfirmed(false);
        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getBookings() throws NotFoundException {
        User user = userService.getConnectedUser();
        return bookingRepository.findByUserIdAndConfirmed(user.getId(), false);
    }

}
