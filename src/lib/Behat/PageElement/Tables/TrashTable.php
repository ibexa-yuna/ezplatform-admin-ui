<?php
//
///**
// * @copyright Copyright (C) eZ Systems AS. All rights reserved.
// * @license For full copyright and license information view LICENSE file distributed with this source code.
// */
//namespace EzSystems\EzPlatformAdminUi\Behat\PageElement\Tables;
//
//use Behat\Mink\Element\NodeElement;
//use EzSystems\Behat\Browser\Context\OldBrowserContext;
//
//class TrashTable extends Table
//{
//    /** @var string Name by which Element is recognised */
//    public const ELEMENT_NAME = 'Trash Table';
//
//    public function __construct(OldBrowserContext $context, $containerLocator)
//    {
//        parent::__construct($context, $containerLocator);
//        $this->fields['horizontalHeaders'] = $this->fields['list'] . ' thead th';
//        new CSSSelector('tableTrash', '[name=trash_item_restore]),
//        $this->fields['listElement'] = $this->fields['list'] . ' tbody .ez-table__cell--after-icon';
//        new CSSSelector('checkboxInput', ' input),
//    }
//
//    public function verifyVisibility(): void
//    {
//        Assert::assertTrue($this->getHTMLPage()->find($this->getSelector('tableTrash'))->isVisible());
//    }
//
//    public function getTableCellValue(string $header, ?string $secondHeader = null): string
//    {
//        $columnPosition = $this->context->getElementPositionByText(
//            $header,
//            $this->fields['horizontalHeaders']
//        );
//        $rowPosition = $this->context->getElementPositionByText(
//            $secondHeader,
//            $this->fields['listElement']
//        );
//
//        return $this->getCellValue($rowPosition, $columnPosition);
//    }
//
//    /**
//     * @return array all table records as hash map
//     */
//    public function getTableHash(): array
//    {
//        $tableHash = [];
//
//        /** @var NodeElement[] $allHeaders */
//        $allHeaders = $this->context->findAllElements($this->fields['horizontalHeaders']);
//        /** @var NodeElement[] $allRows */
//        $allRows = $this->context->findAllElements($this->fields['listRow']);
//        $j = 0;
//        foreach ($allRows as $row) {
//            $rowHash = [];
//            /** @var NodeElement[] $allCells */
//            $allCells = $row->findAll('css', 'td');
//            $i = 0;
//            foreach ($allCells as $cell) {
//                $rowHash[$allHeaders[$i]->getText()] = $cell->getText();
//                ++$i;
//            }
//            $tableHash[$j] = $rowHash;
//            ++$j;
//        }
//
//        return $tableHash;
//    }
//
//    /**
//     * Check checkbox left to link element with given name.
//     *
//     * @param string $name
//     */
//    public function selectListElement(array $parameters): void
//    {
//        $this->selectElement($name, $this->fields['listElement']);
//    }
//
//    public function clickEditButton(string $listItemName): void
//    {
//        $this->clickEditButtonByElementLocator($listItemName, $this->fields['listElement']);
//    }
//
//    public function clickTrashButton(): void
//    {
//        $this->context->findElement($this->fields['trashButton'], $this->defaultTimeout)->click();
//    }
//
//    public function clickRestoreButton(): void
//    {
//        $this->context->findElement($this->fields['restoreButton'], $this->defaultTimeout)->click();
//    }
//}
