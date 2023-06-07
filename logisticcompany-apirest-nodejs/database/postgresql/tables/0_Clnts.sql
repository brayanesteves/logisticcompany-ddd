# --------- <ENGLISH: MODULE. CLIENTS / SPANISH: MÓDULO. CLIENTES> ----------- #

# <ENGLISH: USERS / SPANISH: USUARIOS>
CREATE TABLE IF NOT EXISTS `MIPSS_`.`0_Clnts` (
    `Rfrnc`         INT    (255) NOT NULL AUTO_INCREMENT COMMENT 'Rfrnc         (English: Reference                          / Spanish: Referencia)',
    `Rfrnc_Ncnlty`  INT    (255)     NULL                COMMENT 'Rfrnc_Ncnlty  (English: Reference. Nacionality             / Spanish: Referencia. Nacionalidad)',
    `Rfrnc_Cntry`   INT    (255)     NULL                COMMENT 'Rfrnc_Cntry   (English: Reference. Country                 / Spanish: Referencia. Pais)',
    `IdntfctnDcmnt` VARCHAR(45)  NOT NULL                COMMENT 'IdntfctnDcmnt (English: Identification Document            / Spanish: Documento de Idetentidad)',
    `Nms`           VARCHAR(35)  NOT NULL                COMMENT 'Nms           (English: Names                              / Spanish: Nombres)',
    `Srnms`         VARCHAR(35)  NOT NULL                COMMENT 'Srnms         (English: Surnames                           / Spanish: Apellidos)',
    `RfrntlPhnNmbr` VARCHAR(20)      NULL                COMMENT 'RfrntlPhnNmbr (English: Referential Phone Number           / Spanish: Número de Teléfono Referencial)',
    `TxAddrss`      TEXT         NOT NULL                COMMENT 'TxAddrss      (English: Tax Address                        / Spanish: Domicilio Fiscal)',
    `Eml`           TEXT             NULL                COMMENT 'Eml           (English: Email                              / Spanish: Correo Electrònico)',
    `Prt`           TEXT             NULL                COMMENT 'Prt           (English: Port                               / Spanish: Puerto)',
    `APIKy`         TEXT             NULL                COMMENT 'APIKy         (English: API Key                            / Spanish: Llave de la API)',
    `WrkrURL`       TEXT             NULL                COMMENT 'WrkrURL       (English: Worker URL                         / Spanish: URL de Trabajo)', 
    `Cndtn`         INT    (2)   NOT NULL                COMMENT 'Cndtn         (English: Condition [0: Inactive, 1: Active] / Spanish: Estado    [0: Inactivo, 1: Activo])',
    `Rmvd`          INT    (2)   NOT NULL                COMMENT 'Rmvd          (English: Removed   [0: Inactive, 1: Active] / Spanish: Eliminado [0: Inactivo, 1: Activo])',
    `Lckd`          INT    (2)   NOT NULL                COMMENT 'Lckd          (English: Locked    [0: Inactive, 1: Active] / Spanish: Bloqueado [0: Inactivo, 1: Activo])',
    `DtAdmssn`      DATE             NULL                COMMENT 'DtAdmssn      (English: Date of Admission                  / Spanish: Fecha de Ingreso)',
    `ChckTm`        TIME             NULL                COMMENT 'ChckTm        (English: Check In Time                      / Spanish: Hora de Ingreso)', 
    PRIMARY KEY (`Rfrnc`)
) ENGINE='InnoDB' DEFAULT CHARSET='utf8' COLLATE='utf8_bin' COMMENT='0_Clnts (English: 0 - Clients / Spanish: 0 - Clientes)';