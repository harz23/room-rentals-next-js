import * as Label from '@radix-ui/react-label';
import {useTranslations} from 'next-intl';
import Text from '../Components/Reusables/Text'
import * as Switch from '@radix-ui/react-switch';

type Props = {

}

export default function AddRoom({}: Props) {
    const t = useTranslations('add_cabin'); 

    return <>

        <Text as="h2" variant="h2">{t("add_rentable_cabin")}</Text>
        <div
          style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
        >
          <Label.Root className="LabelRoot" htmlFor="firstName">
            First name
          </Label.Root>
          <input className="Input" type="text" id="firstName" defaultValue="Pedro Duarte" />
        </div>

        <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label className="Label" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
              Airplane mode
            </label>
            <Switch.Root className="SwitchRoot" id="airplane-mode">
              <Switch.Thumb className="SwitchThumb" />
            </Switch.Root>
          </div>
        </form>

    </>
}