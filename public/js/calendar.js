$(document).ready(function () {
    // Inisialisasi kalender
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || []; // Ambil data dari local storage
    $('#calendar').evoCalendar({
        theme: 'Royal Navy',
        language: 'en',
        calendarEvents: savedEvents // Masukkan event yang sudah tersimpan
    });

    // Render daftar kegiatan dari Local Storage
    savedEvents.forEach(event => {
        addEventToList(event);
    });

    // Tangani event submit pada form
    $('#eventForm').on('submit', function (e) {
        e.preventDefault(); // Cegah reload halaman

        // Ambil data dari form
        const nama = $('#nama').val();
        const tanggal = $('#tanggal').val();
        const deskripsi = $('#deskripsi').val();
        const kepentingan = $('#kepentingan').val();

        // Validasi data
        if (!nama || !tanggal || !kepentingan) {
            alert('Semua data wajib diisi!');
            return;
        }

        // Tentukan warna berdasarkan kepentingan
        const color = kepentingan === 'important' ? '#ff0000' : '#63d867'; // Merah untuk sangat penting, hijau untuk tidak penting

        // Buat ID unik untuk event
        const eventId = `event_${Date.now()}`;

        // Buat event baru
        const newEvent = {
            id: eventId, // ID unik
            name: nama,
            date: tanggal,
            description: deskripsi,
            type: 'event',
            color: color // Warna berdasarkan kepentingan
        };

        // Tambahkan event ke kalender
        $('#calendar').evoCalendar('addCalendarEvent', newEvent);

        // Tambahkan ke daftar kegiatan
        addEventToList(newEvent);

        // Simpan event ke Local Storage
        savedEvents.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));

        // Reset form
        $('#eventForm')[0].reset();

        // Tampilkan notifikasi
        alert('Kegiatan berhasil ditambahkan ke kalender!');
    });
});

// Fungsi untuk menambahkan kegiatan ke daftar
function addEventToList(event) {
    $('#eventList').append(`
        <div id="list_${event.id}" style="margin-bottom: 10px;">
            <strong>${event.name}</strong> (${event.date})<br/>
            ${event.description}<br/>
            <span style="color: ${event.color}; font-weight: bold;">
                ${event.color === '#ff0000' ? 'Sangat Penting' : 'Tidak Penting'}
            </span><br/>
            <button onclick="removeEvent('${event.id}')" style="background-color: red; color: white; padding: 5px 10px; border: none; cursor: pointer;">
                Hapus
            </button>
        </div>
    `);
}

// Fungsi untuk menghapus event
function removeEvent(eventId) {
    // Hapus event dari kalender
    $('#calendar').evoCalendar('removeCalendarEvent', eventId);

    // Hapus dari daftar kegiatan
    $(`#list_${eventId}`).remove();

    // Hapus dari Local Storage
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    const updatedEvents = savedEvents.filter(event => event.id !== eventId);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    alert('Kegiatan berhasil dihapus!');
}
