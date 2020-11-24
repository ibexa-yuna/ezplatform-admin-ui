<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\Behat\PageElement;

use Behat\Mink\Session;
use EzSystems\Behat\Browser\Component\Component;
use EzSystems\Behat\Browser\Selector\CSSSelector;

class ContentItemAdminPreview extends Component
{
    /** @var \EzSystems\EzPlatformAdminUi\Behat\PageElement\Fields\FieldTypeComponentInterface[] */
    private $fieldTypeComponents;

    public function __construct(Browser $browser, iterable $fieldTypeComponents)
    {
        parent::__construct($browser);
        $this->fieldTypeComponents = iterator_to_array($fieldTypeComponents);
    }

    public function verifyFieldHasValues(string $fieldLabel, array $expectedValues, ?string $fieldTypeIdentifier)
    {
        $fieldPosition = $this->getFieldPosition($fieldLabel);
        $nthFieldSelector = new CSSSelector('', sprintf($this->getSelector('nthFieldContainer')->getSelector(), $fieldPosition));

        $fieldValueSelector = CSSSelector::combine("%s %s", $nthFieldSelector, $this->getSelector('fieldValue'));
        $fieldTypeIdentifier = $fieldTypeIdentifier ?? $this->detectFieldTypeIdentifier($fieldValueSelector);

        foreach($this->fieldTypeComponents as $fieldTypeComponent)
        {
            if ($fieldTypeComponent->getFieldTypeIdentifier() === $fieldTypeIdentifier) {
                $fieldTypeComponent->setParentContainer($fieldValueSelector);
                $fieldTypeComponent->verifyValueInItemView($expectedValues);

                return;
            }
        }
    }

    private function getFieldPosition(string $fieldLabel): int
    {
        $searchText = sprintf("%s:", $fieldLabel);

        $fields = $this->getHTMLPage()->findAll($this->getSelector('fieldName'));

        $fieldPosition = 1;
        foreach ($fields as $field) {
            if ($field->getText() === $searchText)
            {
                return $fieldPosition;
            }

            $fieldPosition++;
        }
    }

    public function verifyIsLoaded(): void
    {
    }

    protected function specifySelectors(): array
    {
        return [
            new CSSSelector('nthFieldContainer', 'div.ez-content-field:nth-of-type(%s)'),
            new CSSSelector('fieldName', '.ez-content-field-name'),
            new CSSSelector('fieldValue', '.ez-content-field-value'),
            new CSSSelector('fieldValueContainer', ':first-child'),
        ];
    }

    private function detectFieldTypeIdentifier(CSSSelector $fieldValueSelector)
    {
        $fieldClass = $this->getHTMLPage()
            ->find(CSSSelector::combine('%s %s', $fieldValueSelector, $this->getSelector('fieldValueContainer')))
            ->getAttribute('class');

        if (strpos($fieldClass, 'ez-table') !== false) {
            return 'ezmatrix';
        }

        if ($fieldClass === '') {
            return 'ezboolean';
        }

        $fieldTypeIdentifierRegex = '/ez[a-z]*-field/';
        preg_match($fieldTypeIdentifierRegex, $fieldClass, $matches);

        return explode('-', $matches[0])[0];
    }
}
