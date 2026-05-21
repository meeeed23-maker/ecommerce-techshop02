# Étape 1: Build avec Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copier pom.xml et télécharger les dépendances (cache Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier le code source et compiler
COPY src ./src
RUN mvn clean package -DskipTests -B

# Étape 2: Image runtime légère
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copier le JAR depuis l'étape builder
COPY --from=builder /app/target/*.jar app.jar

# Exposer le port
EXPOSE 8080

# Démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
