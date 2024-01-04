package com.roehr.equipmenttracker.repository;

import com.roehr.equipmenttracker.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@Transactional  
@Rollback 
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) 
@ActiveProfiles("mysql") 
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUserSaveAndRetrieve() {
     
        User newUser = new User("testUsername", "testPassword");

        User savedUser = userRepository.save(newUser);

        User retrievedUser = userRepository.findById(savedUser.getId()).orElse(null);

        assertNotNull(retrievedUser);
        assertEquals("testUsername", retrievedUser.getUsername());
    }
}