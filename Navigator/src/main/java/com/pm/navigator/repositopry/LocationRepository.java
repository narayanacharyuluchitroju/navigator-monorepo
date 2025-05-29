package com.pm.navigator.repositopry;

import com.pm.navigator.models.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LocationRepository extends MongoRepository<Location, String> {
    List<Location> findByUserId(String userId);
}
