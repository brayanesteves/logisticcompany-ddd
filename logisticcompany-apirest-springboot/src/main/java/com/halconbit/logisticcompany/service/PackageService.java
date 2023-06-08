package com.halconbit.logisticcompany.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.util.List;

@Service
public class PackageService {
    private final PackageRepository packageRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final JavaMailSender mailSender;

    @Value("${twilio.sid}")
    private String twilioSid;

    @Value("${twilio.token}")
    private String twilioToken;

    @Value("${twilio.sender}")
    private String twilioSender;

    @Value("${email.sender}")
    private String emailSender;

    @Autowired
    public PackageService(PackageRepository packageRepository, UserRepository userRepository,
                          AuthService authService, JavaMailSender mailSender) {
        this.packageRepository = packageRepository;
        this.userRepository = userRepository;
        this.authService = authService;
        this.mailSender = mailSender;
    }

    @Scheduled(fixedRate = 15000) // se ejecuta cada 15 segundos
    public void checkDeliveryDate() throws MessagingException {
        List<Package> packages = packageRepository.findAll();
        LocalDate now = LocalDate.now();

        packages.forEach(package -> {
            if (package.getDeliveryDate().isBefore(now)) {
                package.setSendEmail("send");

                User owner = userRepository.findById(package.getOwner()).orElse(null);
                if (owner != null && owner.getMobile() != null) {
                    package.setSendSMS("send");

                    String messageText = "Su paquete con número de seguimiento " + package.getTrackingNumber() +
                            " ha sufrido un retraso en la entrega. Lo sentimos por cualquier inconveniente.";
                    Message message = Message.creator(
                            new PhoneNumber(owner.getMobile()),
                            new PhoneNumber(twilioSender),
                            messageText
                    ).create();
                }
            }
        });

        packageRepository.saveAll(packages);
    }

    public void sendNotificationEmail(String email, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailSender);
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void sendNotificationSMS(String mobile, String text) {
        Message message = Message.creator(
                new PhoneNumber(mobile),
                new PhoneNumber(twilioSender),
                text
        ).create();
    }
}