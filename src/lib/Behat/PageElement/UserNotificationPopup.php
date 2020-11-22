<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\Behat\PageElement;

use Exception;
use EzSystems\Behat\Browser\Component\Component;
use EzSystems\Behat\Browser\Selector\CSSSelector;
use PHPUnit\Framework\Assert;

class UserNotificationPopup extends Component
{
    public function clickNotification(string $expectedType, string $expectedDescription)
    {
        $notifications = $this->getHTMLPage()->findAll($this->getSelector('notificationItem'));

        foreach($notifications as $notification)
        {
            $type = $notification->find($this->getSelector('notificationType'))->getText();
            if ($type !== $expectedType){
                continue;
            }

            $description = $notification->find($this->getSelector('notificationDescription'))->getText();
            if ($description !== $expectedDescription) {
                continue;
            }

            $notification->click();
            return;
        }

        throw new Exception(sprintf('Notification of type: %s with description: %d not found', $type, $description));
    }

    public function verifyIsLoaded(): void
    {
        Assert::assertContains(
            'Notifications',
            $this->getHTMLPage()->find($this->getSelector('notificationsPopupTitle'))->getText()
        );
    }

    public function getName(): string
    {
        return 'User notification popup';
    }

    protected function specifySelectors(): array
    {
        return [
            new CSSSelector('notificationsPopupTitle', '#view-notifications .modal-title'),
            new CSSSelector('notificationItem', '.ez-notifications-modal__item'),
            new CSSSelector('notificationType', '.ez-notifications-modal__type'),
            new CSSSelector('notificationDescription', '.ez-notifications-modal__description'),
        ];
    }
}
