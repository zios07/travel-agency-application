package common.server.rest;

import common.server.domain.Booking;
import common.server.domain.Order;
import common.server.domain.User;
import common.server.exception.NotFoundException;
import common.server.repository.BookingRepository;
import common.server.repository.OrderRepository;
import common.server.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final UserService userService;
    private final OrderRepository orderRepository;
    private final BookingRepository bookingRepository;

    @GetMapping
    public List<Order> getOrders() throws NotFoundException {
        User user = userService.getConnectedUser();
        return orderRepository.findByUserId(user.getId());
    }

    @PostMapping
    public Order confirmOrder() throws NotFoundException {
        User user = userService.getConnectedUser();
        List<Booking> userBookings = bookingRepository.findByUserIdAndConfirmed(user.getId(), false);
        userBookings = userBookings.stream().map(booking -> {
            booking.setConfirmed(true);
            return booking;
        }).collect(Collectors.toList());

        Order order = new Order();
        order.setBookings(userBookings);
        order.setPrice(userBookings.stream().map(booking -> booking.getProduct().getPrice()).mapToDouble(Double::doubleValue).sum());
        order.setDateTime(LocalDateTime.now());
        order.setUser(user);
        return orderRepository.save(order);
    }

}
