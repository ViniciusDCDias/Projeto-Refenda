-- CreateTable
CREATE TABLE `agendamentos` (
    `data_agen` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `atividade_agen` BOOLEAN NULL DEFAULT true,
    `id_user` INTEGER NOT NULL,
    `id_ref` INTEGER NOT NULL,

    INDEX `id_ref`(`id_ref`),
    PRIMARY KEY (`id_user`, `id_ref`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cardapios` (
    `id_ref` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_ref` VARCHAR(255) NOT NULL,
    `descricao_ref` TEXT NOT NULL,
    `atividade_ref` BOOLEAN NULL DEFAULT true,
    `data_ref` DATE NOT NULL,

    UNIQUE INDEX `data_ref`(`data_ref`),
    PRIMARY KEY (`id_ref`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_user` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tipo_user` ENUM('GESTOR', 'ALUNO', 'FUNCIONARIO') NOT NULL,
    `ra` VARCHAR(15) NULL,

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `ra`(`ra`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agendamentos` ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios`(`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `agendamentos` ADD CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`id_ref`) REFERENCES `cardapios`(`id_ref`) ON DELETE RESTRICT ON UPDATE RESTRICT;
