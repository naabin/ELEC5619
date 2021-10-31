package com.elec5619.rentme.service;

import junit.framework.TestCase;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class ItemServiceTest extends TestCase {

    @Autowired
    private ItemService itemService;

    public void setUp() throws Exception {
        super.setUp();
    }

    public void tearDown() throws Exception {
    }

    public void testSave() {
    }

    public void testFindById() {
    }

    public void testGetAll() {
    }

    public void testUpdate() {

    }

    public void testGetAdvancedSearch() {
    }

    public void testDelete() {
    }

    public void testGetAllUserItems() {
    }

    public void testGetAllItemByName() {
    }

    public void testGetItemsNearby() {
    }
}