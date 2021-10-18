package com.elec5619.rentme.service;


import com.sendgrid.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.io.IOException;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    @Value("${send-grid_api_key}")
    private String apiKey;
    private final TemplateEngine templateEngine;

    @Autowired
    public EmailService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public void sendHtml(String from, String to, String subject, String body, String link) {
        Context context = new Context();
        context.setVariable("subject", subject);
        context.setVariable("message", body);
        context.setVariable("link", link);
        String processEngine = this.templateEngine.process("email-template", context);
        Response response =  sendEmail(from, to, subject, new Content("text/html", processEngine));
        LOGGER.info("Status code: " + response.getStatusCode() + "\nHeaders: " + response.getHeaders());

    }

    private Response sendEmail(String from, String to, String subject, Content content) {
        Mail mail = new Mail(new Email(from), subject, new Email(to), content);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            SendGrid sendGrid = new SendGrid(apiKey);
            return sendGrid.api(request);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response();
        }
    }
}
