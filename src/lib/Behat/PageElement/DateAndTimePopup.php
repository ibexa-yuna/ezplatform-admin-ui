<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\Behat\PageElement;

use DateTime;
use EzSystems\Behat\Browser\Component\Component;
use EzSystems\Behat\Browser\Page\Browser;
use EzSystems\Behat\Browser\Selector\CSSSelector;
use PHPUnit\Framework\Assert;

class DateAndTimePopup extends Component
{
    private const DATETIME_FORMAT = 'd/m/Y';

    private const SETTING_SCRIPT_FORMAT = "document.querySelector('%s %s')._flatpickr.setDate('%s', true, '%s')";

    private const ADD_CALLBACK_TO_DATEPICKER_SCRIPT_FORMAT = 'var fi = document.querySelector(\'%s .flatpickr-input\');
                const onChangeOld = fi._flatpickr.config.onChange;
                const onChangeNew = (dates, dateString, flatpickInstance) => {
                flatpickInstance.input.classList.add("date-set");
            };
        if (onChangeOld instanceof Array) {
                fi._flatpickr.config.onChange = [...onChangeOld, onChangeNew];
        } else if (onChangeOld) {
                fi._flatpickr.config.onChange = [onChangeOld, onChangeNew];
            } else {
                fi._flatpickr.config.onChange = onChangeNew;
            }';

    /**
     * @var bool
     */
    private $isInline;
    /**
     * @var CSSSelector
     */
    private $parentSelector;

    public function __construct(Browser $browser)
    {
        parent::__construct($browser);
        $this->parentSelector = CSSSelector::empty();
    }

    /**
     * @param DateTime $date Date to set
     */
    public function setDate(DateTime $date, string $dateFormat = self::DATETIME_FORMAT): void
    {
        $this->browser->getSession()->executeScript(
            sprintf(
                self::ADD_CALLBACK_TO_DATEPICKER_SCRIPT_FORMAT,
                $this->parentSelector->getSelector()
            ));

        $dateScript = sprintf(
            self::SETTING_SCRIPT_FORMAT,
            $this->parentSelector->getSelector(),
            $this->getSelector('flatpickrSelector')->getSelector(),
            $date->format($dateFormat),
            $dateFormat
        );
        $this->browser->getSession()->getDriver()->executeScript($dateScript);

        Assert::assertTrue(
            $this->getHTMLPage()
                ->find($this->getSelector('dateSet'))
                ->isVisible()
        );
    }

    /**
     * @param string $hour Hour to set
     * @param string $minute Minute to set
     */
    public function setTime(string $hour, string $minute): void
    {
        $isTimeOnly = $this->getHTMLPage()->findAll($this->getSelector('timeOnly'))->any();

        if (!$isTimeOnly) {
            // get current date as it's not possible to set time without setting date
            $currentDateScript = sprintf('document.querySelector("%s %s")._flatpickr.selectedDates[0].toLocaleString()',
                $this->parentSelector->getSelector(),
                $this->getSelector('flatpickrSelector')->getSelector()
            );
            $currentDate = $this->browser->getSession()->getDriver()->evaluateScript($currentDateScript);
        }

        $valueToSet = $isTimeOnly ? sprintf('%s:%s:00', $hour, $minute) : sprintf('%s, %s:%s:00', explode(',', $currentDate)[0], $hour, $minute);
        $format = $isTimeOnly ? 'H:i:S' : 'm/d/Y, H:i:S';

        $timeScript = sprintf(
            self::SETTING_SCRIPT_FORMAT,
            $this->parentSelector->getSelector(),
            $this->getSelector('flatpickrSelector')->getSelector(),
            $valueToSet,
            $format
        );

        $this->browser->getSession()->getDriver()->executeScript($timeScript);
    }

    public function shouldBeInline(bool $isLine): void
    {
        $this->isInline = $isLine;
    }

    public function setParentSelector(CSSSelector $selector)
    {
        $this->parentSelector = $selector;
    }

    public function verifyIsLoaded(): void
    {
        // TODO: Implement verifyIsLoaded() method.
    }

    protected function specifySelectors(): array
    {
        return [
            new CSSSelector('calendarSelectorInline','.flatpickr-calendar.inline'),
            new CSSSelector('calendarSelector', '.flatpickr-calendar'),
            new CSSSelector('flatpickrSelector', '.flatpickr-input'),
            new CSSSelector('dateSet', '.date-set'),
            new CSSSelector('timeOnly', '.flatpickr-calendar.noCalendar'),
        ];
    }
}
