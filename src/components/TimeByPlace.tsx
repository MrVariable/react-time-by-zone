import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import * as ct from 'countries-and-timezones';
import { ITimeByPlaceProp } from "../interfaces/TimeByPlaceProp.interface";

const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const TimeByPlace: React.FC<any> = (props: ITimeByPlaceProp) => {
    const [locality, setLocality] = useState(props.items[0]);
    const [timezones, setTimezones] = useState([]);

    const [time, setTime] = useState('');
    const [timezone, setTimezone] = useState('');

    const prevTimezone = usePrevious(timezone);
    const getTimeByLocality = () => {
        const formatedTime: string = new Intl.DateTimeFormat(locality, {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZone: timezone
        }).format(new Date()).toString();
        setTime(formatedTime);
        console.log(time);
    }

    const handleLocalityChange = (e) => {
        setLocality(e.target.value);
        const countryCode = e.target.value.slice(-2);
        setTimezones(ct.getTimezonesForCountry(countryCode));
    }

    const handleTimezoneChange = (e) => {
        setTimezone(e.target.value)
    };

    useEffect(() => {
        if (timezone && prevTimezone !== timezone) {
            getTimeByLocality();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timezone])

    return (
        <div>
            <h1>👋 Hello Time-seekers!</h1>
            <div className="d-flex justify-content-center">
                <Card bg="dark" text="white" className="mb-2 time-card">
                    <Card.Body>
                        <Card.Title> ⌚ Get Time by selected locality ⌚ </Card.Title>
                        <Card.Body>
                            <div className="my-3">
                                <label className="dropdown-label">Select Locality:</label>
                                <select placeholder="Select locality" className="form-control" value={locality} onChange={handleLocalityChange}>
                                    {props.items.map((item: string, idx: number) => (
                                        <option key={idx} value={item}> {item} </option>
                                    ))}
                                </select>
                            </div>

                            <div className="my-3">
                                <label className="dropdown-label">Select Timezone:</label>
                                <select placeholder="Select timezone" className="form-control" value={timezone} onChange={handleTimezoneChange} disabled={!timezones.length}>
                                    {timezones.map((item: any, idx: number) => (
                                        <option key={idx} value={item.name}> {item.name} </option>
                                    ))}
                                </select>
                            </div>

                            { timezone && time ? <div className="mt-3 time"> Time: {time} </div> : null }
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default TimeByPlace;