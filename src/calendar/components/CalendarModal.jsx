/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale/es';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    /*const [isOpen, setisOpen] = useState(true);*/
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        user: {
            name: ''
        }
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        //console.log("cerrando modal");
        closeDateModal();
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);
        /*console.log(difference);*/

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValues.title.length <= 0) return;

        //console.log(formValues);
        //TODO: 
        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <>
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <div className='d-flex justify-content-between'>
                    {formValues.title.trim() === "" ? (
                        <h3>Nuevo Evento</h3>
                    ) : (
                        <h3>{formValues.title}</h3>
                    )}
                    <p>{formValues.user.name}</p>
                </div>

                <hr />
                <form className="container" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <label>Fecha y hora inicio</label>
                        </div>
                        <div className="col">
                            <DatePicker
                                selected={formValues.start}
                                onChange={(event) => onDateChanged(event, 'start')}
                                className="form-control"
                                dateFormat="Pp"
                                showTimeSelect
                                locale="es"
                                timeCaption="Hora"
                            />
                        </div>

                    </div>

                    <div className="form-row">
                        <div className="col">
                            <label>Fecha y hora fin</label>
                        </div>
                        <div className="col">
                            <DatePicker
                                minDate={formValues.start}
                                selected={formValues.end}
                                onChange={(event) => onDateChanged(event, 'end')}
                                className="form-control"
                                dateFormat="Pp"
                                showTimeSelect
                                locale="es"
                                timeCaption="Hora"
                            />
                        </div>

                    </div>

                    <hr />
                    <div className='mb-2'>
                        <label className='mb-1'>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={onInputChanged}
                        />
                    </div>

                    <div className="mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={onInputChanged}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </>
    );
};