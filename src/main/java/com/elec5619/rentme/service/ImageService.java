package com.elec5619.rentme.service;

import com.elec5619.rentme.entities.Image;
import com.elec5619.rentme.repos.ImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class ImageService implements GeneralService<Image> {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImageService.class);
    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public Image save(Image image) {
        return this.imageRepository.save(image);
    }

    @Override
    public Optional<Image> findById(Long id) {
        return this.imageRepository.findById(id);
    }

    @Override
    public List<Image> getAll() {
        return this.imageRepository.findAll();
    }

    @Override
    public Image update(Image image) {
        return this.imageRepository.saveAndFlush(image);
    }

    @Override
    public void delete(Long id) {
        this.imageRepository.deleteById(id);
    }

    public byte[] compressBytes(byte[] data ) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(data.length);
        deflater.finish();
        byte[] buffer = new byte[1024];
        while(!deflater.finished()) {
            int count = deflater.deflate(buffer);
            byteArrayOutputStream.write(buffer, 0, count);
        }
        try {
            byteArrayOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        LOGGER.info("Compressed image byte size - " + byteArrayOutputStream.toByteArray().length);
        return byteArrayOutputStream.toByteArray();
    }

    public byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            LOGGER.error("Unknown error occurred while decompressing the image bytes");
        }
        return outputStream.toByteArray();
    }
}
