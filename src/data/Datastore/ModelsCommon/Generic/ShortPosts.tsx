
import { DsGenericItem } from "../../../../models";
import { LANGUAGE } from "../../../../util/common/language";
import { stageMandatoryTextField } from "../Base/Staging";
import { ShortPost, _CATEGORY_EXPIRED_SHORT_POST_, _CATEGORY_SHORT_POST_ } from "./ShortPostTypes";


export function stageShortPost(lg: LANGUAGE, post: DsGenericItem) : ShortPost | undefined {
  const {id, displayId, category, textField, isActive} = post;

  if (category && [_CATEGORY_SHORT_POST_, _CATEGORY_EXPIRED_SHORT_POST_].includes(category)) {
    if (textField) {
      const text = stageMandatoryTextField(lg, textField);
      const {title, publishDate, blocks} = JSON.parse(text);

      return({
        id,
        isActive: isActive || false,
        displayId,
        title,
        publishDate: new Date(publishDate),
        blocks
      })
    }
  }
}

