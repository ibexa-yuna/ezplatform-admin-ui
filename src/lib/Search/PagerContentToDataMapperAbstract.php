<?php
/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
declare(strict_types=1);

namespace EzSystems\EzPlatformAdminUi\Search;

use eZ\Publish\API\Repository\ContentTypeService;
use eZ\Publish\API\Repository\LanguageService;
use eZ\Publish\API\Repository\UserService;
use eZ\Publish\API\Repository\Values\Content\Content;
use eZ\Publish\API\Repository\Values\Content\ContentInfo;
use eZ\Publish\API\Repository\Values\Content\Language;
use eZ\Publish\API\Repository\Values\User\User;
use eZ\Publish\Core\Helper\TranslationHelper;
use eZ\Publish\Core\MVC\Symfony\Locale\UserLanguagePreferenceProviderInterface;
use EzSystems\EzPlatformAdminUi\Specification\ContentIsUser;
use EzSystems\EzPlatformAdminUi\Specification\UserExists;

class PagerContentToDataMapperAbstract
{
    /** @var \eZ\Publish\Core\Helper\TranslationHelper */
    protected $translationHelper;

    /** @var \eZ\Publish\API\Repository\ContentTypeService */
    private $contentTypeService;

    /** @var \eZ\Publish\API\Repository\UserService */
    private $userService;

    /** @var \eZ\Publish\Core\MVC\Symfony\Locale\UserLanguagePreferenceProviderInterface */
    private $userLanguagePreferenceProvider;

    /** @var \eZ\Publish\API\Repository\LanguageService */
    private $languageService;

    /**
     * @param \eZ\Publish\API\Repository\ContentTypeService $contentTypeService
     * @param \eZ\Publish\API\Repository\UserService $userService
     * @param \eZ\Publish\Core\MVC\Symfony\Locale\UserLanguagePreferenceProviderInterface $userLanguagePreferenceProvider
     * @param \eZ\Publish\Core\Helper\TranslationHelper $translationHelper
     * @param \eZ\Publish\API\Repository\LanguageService $languageService
     */
    public function __construct(
        TranslationHelper $translationHelper,
        ContentTypeService $contentTypeService,
        UserService $userService,
        UserLanguagePreferenceProviderInterface $userLanguagePreferenceProvider,
        LanguageService $languageService
    ) {
        $this->contentTypeService = $contentTypeService;
        $this->userService = $userService;
        $this->userLanguagePreferenceProvider = $userLanguagePreferenceProvider;
        $this->translationHelper = $translationHelper;
        $this->languageService = $languageService;
    }

    /**
     * @param \eZ\Publish\API\Repository\Values\Content\Content $content
     * @param bool $filterDisabled
     *
     * @return \eZ\Publish\API\Repository\Values\Content\Language[]
     */
    protected function getAvailableTranslations(
        Content $content,
        bool $filterDisabled = false
    ): iterable {
        $availableTranslationsLanguages = $this->languageService->loadLanguageListByCode(
            $content->versionInfo->languageCodes
        );

        if (false === $filterDisabled) {
            return $availableTranslationsLanguages;
        }

        return array_filter(
            $availableTranslationsLanguages,
            (static function (Language $language): bool {
                return $language->enabled;
            })
        );
    }

    /**
     * @param \eZ\Publish\API\Repository\Values\Content\Content $content
     *
     * @return bool
     */
    protected function isContentIsUser(Content $content): bool
    {
        return (new ContentIsUser($this->userService))->isSatisfiedBy($content);
    }

    /**
     * @param \eZ\Publish\API\Repository\Values\Content\ContentInfo $contentInfo
     *
     * @return \eZ\Publish\API\Repository\Values\User\User|null
     */
    protected function getContributor(ContentInfo $contentInfo): ?User
    {
        $userExists = (new UserExists($this->userService))->isSatisfiedBy($contentInfo->ownerId);

        if (false === $userExists) {
            return null;
        }

        return $this->userService->loadUser($contentInfo->ownerId);
    }

    /**
     * @param array $data
     * @param array $contentTypeIds
     */
    protected function setTranslatedContentTypesNames(array &$data, array $contentTypeIds): void
    {
        // load list of Content Types with proper translated names
        $contentTypes = $this->contentTypeService->loadContentTypeList(
            array_unique($contentTypeIds),
            $this->userLanguagePreferenceProvider->getPreferredLanguages()
        );

        foreach ($data as $idx => $item) {
            /** @var \eZ\Publish\API\Repository\Values\ContentType\ContentType $contentType */
            // get content type from bulk-loaded list or fallback to lazy loaded one if not present
            $contentType = isset($contentTypes[$item['contentTypeId']])
                ? $contentTypes[$item['contentTypeId']]
                : $item['content']->getContentType();

            $data[$idx]['type'] = $contentType->getName();
            unset($data[$idx]['content'], $data[$idx]['contentTypeId']);
        }
    }
}
