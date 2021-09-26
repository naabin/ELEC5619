package com.elec5619.rentme.controller;
import com.elec5619.rentme.entities.Lender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePage {

    @RequestMapping("/home")
    public String index(Model model) {
        return "index";
    }
}
