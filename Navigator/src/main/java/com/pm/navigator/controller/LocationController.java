package com.pm.navigator.controller;

import com.pm.navigator.models.Location;
import com.pm.navigator.service.LocationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//@CrossOrigin(origins = "http://frontend:80") // Docker internal call
public class LocationController {

    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    // GET all locations for a user
    @GetMapping
    public ResponseEntity<List<Location>> getLocations(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Location> locations = service.getLocationsByUser(userId);
        return ResponseEntity.ok(locations);
    }




    // POST a new location
    @PostMapping
    public ResponseEntity<Location> addLocation(
            @RequestBody Location location,
            HttpServletRequest request) {

        String userId = (String) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        location.setUserId(userId);
        Location savedLocation = service.addLocation(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }


    // DELETE a location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable String id) {
        service.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
