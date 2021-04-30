package common.server.repository;

import common.server.domain.CityBreak;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityBreakRepository extends JpaRepository<CityBreak, Long> {
    List<CityBreak> findByCity(String city);
}
