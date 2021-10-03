package com.elec5619.rentme.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePage {

    @RequestMapping("/")
    public String index(Model model) {
        return "";
    }
}
