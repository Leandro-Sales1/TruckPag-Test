import { render, screen, fireEvent } from '@testing-library/react';
import DescriptionText from './DescriptionText';

describe('DescriptionText', () => {
  it('should truncate text and show "Show more" button initially', () => {
    const longText = 'This is a long text that exceeds the truncation length and should be cut off.';

    render(<DescriptionText text={longText} />);
    expect(screen.getByText('This is a long text that exceeds the truncation length and should be cu..')).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should show the full text if it is short', () => {
    const shortText = 'Short text';

    render(<DescriptionText text={shortText} />);
    expect(screen.getByText('Short text..')).toBeInTheDocument();
    expect(screen.queryByText('Show more')).toBeInTheDocument();
  });

  it('should toggle between "Show more" and "Show less" when clicked', () => {

    const longText = 'This is a long text that exceeds the truncation length and should be cut off.';

    render(<DescriptionText text={longText} />);
    expect(screen.getByText('This is a long text that exceeds the truncation length and should be cu..')).toBeInTheDocument();

    const showMoreButton = screen.getByText('Show more');
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);
    expect(screen.getByText('This is a long text that exceeds the truncation length and should be cut off.')).toBeInTheDocument();
    expect(screen.getByText('Show less')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Show less'));
    expect(screen.getByText('This is a long text that exceeds the truncation length and should be cu..')).toBeInTheDocument();
  });
});
