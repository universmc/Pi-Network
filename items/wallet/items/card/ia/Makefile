# Makefile

CC = gcc
CFLAGS = -Wall -O2

.PHONY: all clean

all: programme

programme: fichier1.o fichier2.o
    $(CC) $(CFLAGS) -o programme fichier1.o fichier2.o

fichier1.o: fichier1.c
    $(CC) $(CFLAGS) -c fichier1.c

fichier2.o: fichier2.c
    $(CC) $(CFLAGS) -c fichier2.c

clean:
    rm -f *.o programme
