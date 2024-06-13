import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';

import { CalendarModal, EventBox, FabAddNew, FabDelete, NavBar } from '../';
import { getMessages } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

const locales = {
  'es': esES,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

/*const events = [{
  title: "Prueba evento",
  notes: "Notas de Prueba",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "fafafa",
  user: {
    _id: 123,
    name: "Agus"
  },
}]*/

export const CalendarPage = () => {

  const nombreUsuario = "Agustina";

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = () => {
    //console.log(event, start, end, isSelected);

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  };

  const onDoubleClick = () => {
    //console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = (event) => {
    //console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = (event) => {
    //console.log({onViewChanged: event})
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal usuario={nombreUsuario}/>

      <FabAddNew/>

      <FabDelete/>

    </>
  );
};