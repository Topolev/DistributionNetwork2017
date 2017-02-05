package com.distributionnetwork.app.service.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static com.distributionnetwork.app.service.util.UploadImageErrors.IMAGE_NOT_EXCITED;


/**
 * Created by Vladimir on 04.11.2016.
 */
public class UploadUtil {

    private static final Logger LOG = LoggerFactory.getLogger(UploadUtil.class);

    private static Set<String> accessExt = new HashSet<>(Arrays.asList("JPG", "PNG", "BMP", "GIF", "TIF"));


    public static byte[] getImageFromStringBase64(String image) throws ServiceException {
        if (image == null) {
            throw new ServiceException("logoUser", "uploadimageproblem", IMAGE_NOT_EXCITED.toString());
        }

        return DatatypeConverter.parseBase64Binary(image.substring(image.indexOf(",") + 1));
    }

}
