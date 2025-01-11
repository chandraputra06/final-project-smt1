$(document).ready(function () {
    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    
    $('#calendar').evoCalendar({
        theme: 'Royal Navy',
        language: 'en',
        calendarEvents: savedEvents
    });


    renderEventList();

    $('#eventForm').on('submit', function (e) {
        e.preventDefault();

        const nama = $('#nama').val();
        const tanggal = $('#tanggal').val();
        const deskripsi = $('#deskripsi').val();
        const kepentingan = $('#kepentingan').val();

        if (!nama || !tanggal || !kepentingan) {
            alert('Semua data wajib diisi!');
            return;
        }

        const color = kepentingan === 'important' ? '#ff0000' : '#63d867';
        const eventId = `event_${Date.now()}`;

        const newEvent = {
            id: eventId,
            name: nama,
            date: tanggal,
            description: deskripsi,
            type: 'event',
            color: color
        };

        $('#calendar').evoCalendar('addCalendarEvent', newEvent);

        const currentEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        currentEvents.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(currentEvents));

        addEventToList(newEvent);

        $('#eventForm')[0].reset();
        alert('Kegiatan berhasil ditambahkan ke kalender!');
    });
});

function renderEventList() {
    const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    $('#eventList').empty();
    events.forEach(event => {
        addEventToList(event);
    });
}


function addEventToList(event) {
    $('#eventList').append(`
        <div id="list_${event.id}" class="event-item">
            <div class="event-header">
                <span class="event-name-container">
                    <span class="event-name">${event.name}</span>
                </span>
                <span class="event-date">${event.date}</span>
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-footer">
                <span class="priority-tag" style="background-color: ${event.color}">
                    ${event.color === '#ff0000' ? 'Sangat Penting' : 'Tidak Penting'}
                </span>
                <button onclick="removeEvent('${event.id}')" class="delete-btn">
                    Hapus
                </button>
            </div>
        </div>
    `);
 
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .event-item {
                background: #115e59;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: transform 0.2s ease;
            }

            .event-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }

            .event-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .event-name-container {
               background: #042f2e;
               padding: 5px 10px;
               border-radius: 4px;
               display: inline-block;
           }

            .event-name {
                font-size: 1.1em;
                font-weight: bold;
                color: #fff;
            }

            .event-date {
                color: #fff;
                font-size: 0.9em;
            }

            .event-description {
                color: #fff;
                margin: 8px 0;
                line-height: 1.4;
            }

            .event-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }

            .priority-tag {
                padding: 4px 8px;
                border-radius: 4px;
                color: white;
                font-size: 0.9em;
            }

            .delete-btn {
                background-color: #ff4444;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }

            .delete-btn:hover {
                background-color: #ff0000;
            }
        `)
        .appendTo('head');
}


function removeEvent(eventId) {
    $('#calendar').evoCalendar('removeCalendarEvent', eventId);

    const savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    const updatedEvents = savedEvents.filter(event => event.id !== eventId);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    $(`#list_${eventId}`).remove();

    alert('Kegiatan berhasil dihapus!');
}