import { useState, useEffect } from 'react'
import { Connector, useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi'
import { Avatar, DropdownMenu, IconButton, Tooltip } from '@radix-ui/themes'
import { AvatarIcon, CopyIcon } from '@radix-ui/react-icons'
import Blockies from 'react-blockies'
import { useMounted } from '@/app/internal/hooks'
import { useToast } from '@/app/internal/toast'
import { FontNotoSansMono } from '@/app/internal/fonts'

export default () => {
  const toast = useToast()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  return useMounted() && (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size='4' variant='soft' radius='full' style={{
          position: 'fixed',
          right: 30,
          top: 5,
        }}>
          {address !== undefined ? (
            <Avatar style={{
              overflow: 'hidden',
            }} fallback={
              <Blockies scale={5} seed={address.toLowerCase()} />
            } />
          ) : (
            <AvatarIcon width={20} height={20} />
          )}
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant='soft'>
        {address !== undefined && (
          <Tooltip side='left' content={address} style={{ ...FontNotoSansMono }}>
            <DropdownMenu.Item style={{ ...FontNotoSansMono }} onClick={() => {
              navigator.clipboard.writeText(address)
              toast('Address copied~')
            }}>
              <CopyIcon style={{
                marginRight: 3,
                color: 'var(--accent-11)'
              }} />
              {address.slice(0, 4) + '...' + address.slice(-2)}
            </DropdownMenu.Item>
          </Tooltip>
        )}
        {isConnected ? (
          <DropdownMenu.Item color='red' onClick={() => disconnect()} style={{ ...FontNotoSansMono }}>
            Disconnect
          </DropdownMenu.Item>
        ) : (
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger style={{ ...FontNotoSansMono }}>
              Connect
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {connectors.length === 0 ? (
                <DropdownMenu.Item disabled style={{ ...FontNotoSansMono }}>
                  No Connector
                </DropdownMenu.Item>
              ) : connectors.map(connector => (
                <WalletOption key={connector.uid} connector={connector} />
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const WalletOption = ({ connector }: {
  connector: Connector,
}) => {
  const { connect } = useConnect()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    ; (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])
  return (
    <DropdownMenu.Item disabled={!ready} style={{ ...FontNotoSansMono }} onClick={() => connect({ connector })}>
      {connector.name}
    </DropdownMenu.Item>
  )
}
