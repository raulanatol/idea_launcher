DESTDIR = /usr/local/bin

PROGRAM = idea

install: $(PROGRAM)
	cp $(PROGRAM) $(DESTDIR)
	chmod +x $(DESTDIR)/$(PROGRAM)

uninstall:
	rm -f $(DESTDIR)/$(PROGRAM)
