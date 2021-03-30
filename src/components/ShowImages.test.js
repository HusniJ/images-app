import { render, screen } from '@testing-library/react';
import ShowImages from './ShowImages'; 

test('should render correctly', () => {
    render(<ShowImages userId={'123'} userImages={
        [
            {
                    src: "http://google.com",
                    width: 1,
                    height: 1
            }
        ]
    }/>);
    expect(screen).toMatchSnapshot();
})