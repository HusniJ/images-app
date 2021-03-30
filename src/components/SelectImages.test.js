import { render, screen } from '@testing-library/react'
import SelectImages from './SelectImages';

test('should render', () => {
    render(<SelectImages userId={'123'} userImages={[
    {
            src: "http://google.com",
            width: 1,
            height: 1
    }]}/>);
    expect(screen).toMatchSnapshot();
  });
  