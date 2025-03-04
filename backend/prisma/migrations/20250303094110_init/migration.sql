-- CreateTable
CREATE TABLE `health_declarations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `temperature` DOUBLE NOT NULL,
    `contactedWithCovid19Suspects` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `symptoms` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `symptoms_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SymptomHealthDeclaration` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SymptomHealthDeclaration_AB_unique`(`A`, `B`),
    INDEX `_SymptomHealthDeclaration_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SymptomHealthDeclaration` ADD CONSTRAINT `_SymptomHealthDeclaration_A_fkey` FOREIGN KEY (`A`) REFERENCES `health_declarations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SymptomHealthDeclaration` ADD CONSTRAINT `_SymptomHealthDeclaration_B_fkey` FOREIGN KEY (`B`) REFERENCES `symptoms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
