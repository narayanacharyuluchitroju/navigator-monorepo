package com.pm.navigator.service;


import com.pm.navigator.models.Location;
import com.pm.navigator.repositopry.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository repo;

    public LocationService(LocationRepository repo) {
        this.repo = repo;
    }

    public List<Location> getLocationsByUser(String userId) {
        return repo.findByUserId(userId);
    }

    public Location addLocation(Location loc) {
        return repo.save(loc);
    }

    public void deleteLocation(String id) {
        repo.deleteById(id);
    }
}
